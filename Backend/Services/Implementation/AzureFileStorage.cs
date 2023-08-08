using Azure.Storage.Blobs;

namespace Backend.Services.Implementation
{
    // public class AzureFileStorage : IFileStorage
    public class AzureFileStorage
    {
     private string? connectingString; 

        public AzureFileStorage(IConfiguration configuartion){
            connectingString = configuartion.GetConnectionString("AzureStorageConnection");
        }

        public async Task<string> GetFile(string fileRoute, string containerName)
        {
            
            var client = new BlobContainerClient(connectingString, containerName);
            await client.CreateIfNotExistsAsync();
            var fileName = Path.GetFileName(fileRoute);
            var blob = client.GetBlobClient(fileName);
            return blob.Uri.AbsoluteUri;
        }
        public async Task DeleteFile(string fileRoute, string containerName)
        {
           if (string.IsNullOrEmpty(fileRoute))
            {
                return;
            }

            var client = new BlobContainerClient(connectingString, containerName);
            await client.CreateIfNotExistsAsync();
            var fileName = Path.GetFileName(fileRoute);
            var blob = client.GetBlobClient(fileName);
            await blob.DeleteIfExistsAsync();
        }

        public async Task<string> SaveFile(string containerName, IFormFile file)
        {
            var client = new BlobContainerClient(connectingString, containerName);
            await client.CreateIfNotExistsAsync();
            client.SetAccessPolicy(Azure.Storage.Blobs.Models.PublicAccessType.Blob);

            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            var blob = client.GetBlobClient(fileName);
            await blob.UploadAsync(file.OpenReadStream());
            return blob.Uri.ToString();
        }

        public async Task<string> UpdateFile(string containerName, IFormFile file, string fileRoute)
        {
            await DeleteFile(fileRoute, containerName);
            return await SaveFile(containerName, file);
        }
    }
}