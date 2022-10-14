namespace backend.Models
{
    public class QueryParams
    {
        public int[]? categories { get; set; }
        public int[]? brands { get; set; }
        public int minPrice { get; set; }
        public int maxPrice { get; set; }
        public int limit { get; set; }
    }
}