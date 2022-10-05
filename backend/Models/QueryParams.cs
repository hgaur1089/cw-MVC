namespace backend.Models
{
    public class QueryParams
    {
        public int[]? categories { get; set; }
        public int[]? brands { get; set; }
        public int min_price { get; set; }
        public int max_price { get; set; }
        public int limit { get; set; }
    }
}