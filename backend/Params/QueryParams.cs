namespace backend.Params;

public class DefaultParameters{
    public int limit {get; set;}
}
public class QueryParams:DefaultParameters{
    public string[]? brands {get; set;} 
    public string[]? categories {get; set;}
    public int min_price {get; set;}
    public int max_price {get; set;}
}