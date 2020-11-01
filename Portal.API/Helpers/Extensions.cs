using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Portal.API.Helpers
{
    public static class Extensions
    {
        public static int CalculateAge(this DateTime dateTime){
             var age = DateTime.Today.Year - dateTime.Year;
             if(dateTime.AddYears(age)>DateTime.Today)
             age--;
             return age;
        }

          public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static void AddPagination(this HttpResponse response, int currantPage,
        int itemPerPage,int totalItems,int totalPages){
            var paginationHeader = new PaginationHeader(currantPage, itemPerPage,totalItems,totalPages);
            var camelCaseFormater =  new JsonSerializerSettings();
            camelCaseFormater.ContractResolver = new CamelCasePropertyNamesContractResolver();

            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader,camelCaseFormater));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}