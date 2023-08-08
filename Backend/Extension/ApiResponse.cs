using System.Net;

namespace Backend.Extension
{
    public class ApiResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess { get; set; } = true;
        public List<string> ErrorMessages { get; set; }
        public object Result { get; set; } = null!;

        public ApiResponse()
        {
            ErrorMessages = new List<string>();
        }
    }
}