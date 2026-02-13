using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace React_with_ASP.NETCore.Controllers
{
     [ApiController]
     [Route("api/[controller]")]
     public class BoldBIEmbedController : Controller
     {
          [HttpGet]
          [Route("GetData")]
          public IActionResult GetData()
          {
            var jsonData = System.IO.File.ReadAllText("embedConfig.json");
            return Json(new
            {
                DashboardId = GlobalAppSettings.EmbedDetails.DashboardId,
                ServerUrl = GlobalAppSettings.EmbedDetails.ServerUrl,
                EmbedType = GlobalAppSettings.EmbedDetails.EmbedType,
                Environment = GlobalAppSettings.EmbedDetails.Environment,
                SiteIdentifier = GlobalAppSettings.EmbedDetails.SiteIdentifier
            });
          }

        [HttpPost]
        [Route("TokenGeneration")]
        public string TokenGeneration()
        {
            var embedDetails = new
            {
                email = GlobalAppSettings.EmbedDetails.UserEmail,
                serverurl = GlobalAppSettings.EmbedDetails.ServerUrl,
                siteidentifier = GlobalAppSettings.EmbedDetails.SiteIdentifier,
                embedsecret = GlobalAppSettings.EmbedDetails.EmbedSecret,
                dashboard = new  // Dashboard ID property is mandatory only when using BoldBI version 14.1.11.
                {
                    id = GlobalAppSettings.EmbedDetails.DashboardId
                }
            };
            
            //Post call to Bold BI server
            var client = new HttpClient();
            var requestUrl = $"{embedDetails.serverurl}/api/{embedDetails.siteidentifier}/embed/authorize";

            var jsonPayload = JsonConvert.SerializeObject(embedDetails);
            var httpContent = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            var result = client.PostAsync(requestUrl, httpContent).Result;
            var resultContent = result.Content.ReadAsStringAsync().Result;

            return JsonConvert.DeserializeObject<dynamic>(resultContent).Data.access_token;
        }
     }
}
