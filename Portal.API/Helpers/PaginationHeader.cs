namespace Portal.API.Helpers
{
    public class PaginationHeader
    {
         public int CurrantPage { get; set; }
        public int ItemPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public PaginationHeader(int currantPage,int itemPerPage,int totalItems,int totalPages)
        {
            CurrantPage = currantPage;
            ItemPerPage =itemPerPage;
            TotalItems = totalItems;
            TotalPages = totalPages;
        }
    }
}