using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.DataLibrary;
using backend.Params;
using Dapper;

namespace backend.Controllers;

[ApiController]
public class ApiController : Controller
{
    IDataAccess _data;
    IConfiguration _config;
    public ApiController(IDataAccess data, IConfiguration config)
    {
        _data = data;
        _config = config;
    }

    [HttpGet]
    [Route("/products")]
    [Route("/")]
    public async Task<List<ProductModel>> GetProducts([FromQuery]QueryParams query)
    {
        string sql = "SELECT products.id, title, description, price, discount, rating, stock, imageurl, categories.name as category, brands.name as brand, image1, image2, image3, image4, image5 FROM products JOIN categories ON products.category_id = categories.id  JOIN brands ON products.brand_id = brands.id JOIN images ON products.id = images.id LIMIT @limit,10";
        
        var querparam = new {limit = query.limit};

        var products = await _data.LoadData<ProductModel, dynamic>(sql, querparam, _config.GetConnectionString("Default"));
        return products;
    }

    [HttpGet]
    [Route("/products/search")]
    public async Task<List<ProductModel>> GetFilteredProducts([FromQuery]QueryParams query)
    {
        string sql = "SELECT products.id, title, description, price, discount, rating, stock, imageurl, categories.name as category, brands.name as brand, image1, image2, image3, image4, image5 FROM products JOIN categories ON products.category_id = categories.id  JOIN brands ON products.brand_id = brands.id JOIN images ON products.id = images.id";// WHERE  categories.name IN @categories AND brands.name IN @brands AND price between @min_price AND @max_price LIMIT @limit,10";

        if(query.categories != null){
            sql += " WHERE categories.name IN @categories";
        }
        if(query.brands != null){
            sql += " AND brands.name IN @brands";
        }
        if(query.min_price != 0 && query.max_price != 0){
            sql += " AND price between @min_price AND @max_price";
        }
        sql += " LIMIT @limit,10";

        var querparam = new {categories = query.categories, brands = query.brands, min_price = query.min_price, max_price = query.max_price, limit = query.limit};

        var products = await _data.LoadData<ProductModel, dynamic>(sql, querparam, _config.GetConnectionString("Default"));
        return products;
    }

    [HttpGet]
    [Route("/getbrands")]
    public async Task<List<BrandModel>> GetBrands()
    {
        string sql = "SELECT * FROM brands";
        var brands = await _data.LoadData<BrandModel, dynamic>(sql, new { }, _config.GetConnectionString("Default"));
        return brands;
    }

    [HttpGet]
    [Route("/getcategories")]
    public async Task<List<CategoryModel>> GetCategories()
    {
        string sql = "select * from categories";
        var categories = await _data.LoadData<CategoryModel, dynamic>(sql, new { }, _config.GetConnectionString("Default"));
        return categories;
    }
}