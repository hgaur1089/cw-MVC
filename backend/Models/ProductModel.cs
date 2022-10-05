namespace backend.Models
{
    public class ProductModel
    {
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public decimal price { get; set; }
        public decimal discount { get; set; }
        public decimal rating { get; set; }
        public int stock { get; set; }
        public string imageurl { get; set; }
        public string brand { get; set; }
        public string category { get; set; }

        public string image1 {get; set;}
        public string image2 {get; set;}
        public string image3 {get; set;}
        public string image4 {get; set;}
        public string image5 {get; set;}
        public string image6 {get; set;}
    }
}