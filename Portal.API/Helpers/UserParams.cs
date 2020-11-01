namespace Portal.API.Helpers
{
    public class UserParams
    {
        public const int MaxPageSize = 36;
        public int pageNumber { get; set; } = 1;
        private int pageSize = 18;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize)? MaxPageSize:value; }
        }
        
    }
}