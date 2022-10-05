using System;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.DataLibrary;
using backend.Models;
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
    public async Task<List<ProductModel>> GetProducts([FromQuery] int page=0)
    {   
        page = page < 0 ? 0 : page*9;
        string sql = $"SELECT products.id, title, description, price, discount, rating, stock, imageurl, categories.name as category, brands.name as brand, image1, image2, image3, image4, image5 FROM products JOIN categories ON products.category_id = categories.id  JOIN brands ON products.brand_id = brands.id JOIN images ON products.id = images.id LIMIT {page},9";

        var products = await _data.LoadData<ProductModel, dynamic>(sql, new {}, _config.GetConnectionString("Default"));
        return products;
    }

    [HttpGet]
    [Route("/products/search")]
    public async Task<List<ProductModel>> GetFilteredProducts([FromQuery] QueryParams query)
    {
        var categoriesList = await _data.LoadData<CategoryModel, dynamic>("SELECT id FROM categories", new { }, _config.GetConnectionString("Default"));
        var brandsList = await _data.LoadData<BrandModel, dynamic>("SELECT id FROM brands", new { }, _config.GetConnectionString("Default"));
        string sql = "SELECT products.id, title, description, price, discount, rating, stock, imageurl, categories.name as category, brands.name as brand, image1, image2, image3, image4, image5 FROM products JOIN categories ON products.category_id = categories.id  JOIN brands ON products.brand_id = brands.id JOIN images ON products.id = images.id";

        if (query.categories != null && query.categories.Length > 0)
        {
            sql += " WHERE categories.id IN (";
            for (int i = 0; i < query.categories.Length; i++)
            {
                if (categoriesList.Any(x => x.id == query.categories[i]))
                {
                    sql += query.categories[i];
                    if (i != query.categories.Length - 1)
                    {
                        sql += ",";
                    }
                }
            }
            sql += ")";
        } else {
            sql += " WHERE categories.id IN (";
            for (int i = 0; i < categoriesList.Count; i++)
            {
                sql += categoriesList[i].id;
                if (i != categoriesList.Count - 1)
                {
                    sql += ",";
                }
            }
            sql += ")";
        }

        if(query.brands != null && query.brands.Length > 0)
        {
            sql += " AND brands.id IN (";
            for (int i = 0; i < query.brands.Length; i++)
            {
                if (brandsList.Any(x => x.id == query.brands[i]))
                {
                    sql += query.brands[i];
                    if (i != query.brands.Length - 1)
                    {
                        sql += ",";
                    }
                }
            }
            sql += ")";
        } else {
            sql += " AND brands.id IN (";
            for (int i = 0; i < brandsList.Count; i++)
            {
                sql += brandsList[i].id;
                if (i != brandsList.Count - 1)
                {
                    sql += ",";
                }
            }
            sql += ")";
        }

        var min_price = 0; 
        if(query.min_price > 0)
        {
            min_price = query.min_price;
        }

        var max_price = 1000000;
        if(query.max_price > 0)
        {
            max_price = query.max_price;
        }
        
        int page = 0;
        if(query.limit > 0)
        {
            page = query.limit*9;
        }

        sql += $" AND price between {min_price} AND {max_price} LIMIT {page},9";

        var products = await _data.LoadData<ProductModel, dynamic>(sql, new {}, _config.GetConnectionString("Default"));
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