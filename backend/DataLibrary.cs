using Dapper;
using System.Data;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;


namespace backend.DataLibrary
{
    public class DataAccess : IDataAccess
    {
        public async Task<List<T>> LoadData<T, U>(string sql ,U parameters, string connectionString)
        {
            using (IDbConnection cnn = new MySqlConnection(connectionString))
            {
                var rows = await cnn.QueryAsync<T>(sql, parameters);
                return rows.ToList();
            }
        }
    }
}