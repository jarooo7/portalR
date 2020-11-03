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
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public int UserId { get; set; }
        public string Gender { get; set; }

        public int MinAge { get; set; } = 16;
        public int MaxAge { get; set; } = 100;

        public string City { get; set; } = "";
        public string OrderBy { get; set; }
        public bool UserLikes { get; set; }=false;
        public bool UserIsLiked { get; set; } = false;
    }
}