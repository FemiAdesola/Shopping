using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Backend.Services.Interface;

namespace Backend.Services.Implementation
{
    public class AzureBlobService : IAzureBlobService
    {
    private readonly BlobServiceClient _blobClient;

        public AzureBlobService(BlobServiceClient blobClient)
        {
            _blobClient = blobClient;
        }
        public async Task<bool> DeleteBlob(string blobName, string containerName)
        {
            BlobContainerClient blobContainerClient = _blobClient.GetBlobContainerClient(containerName);
            BlobClient blobClient = blobContainerClient.GetBlobClient(blobName);

            return await blobClient.DeleteIfExistsAsync();

        }

        public async Task<string> GetBlob(string blobName, string containerName)
        {
            BlobContainerClient blobContainerClient = _blobClient.GetBlobContainerClient(containerName);
            BlobClient blobClient = blobContainerClient.GetBlobClient(blobName);
            return blobClient.Uri.AbsoluteUri;
        }

        public async Task<string> UploadBlob(string blobName, string containerName, IFormFile file)
        {
            BlobContainerClient blobContainerClient = _blobClient.GetBlobContainerClient(containerName);
            BlobClient blobClient = blobContainerClient.GetBlobClient(blobName);
            var httpHeaders = new BlobHttpHeaders()
            {
                ContentType = file.ContentType
            };
            var result = await blobClient.UploadAsync(file.OpenReadStream(),httpHeaders);
            if (result != null)
            {
                return await GetBlob(blobName, containerName);
            }
            return "";
        }
    }
}