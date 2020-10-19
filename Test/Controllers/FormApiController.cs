using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Test.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormApiController : ControllerBase
    {

        private static readonly string Password = "123";

        private readonly ILogger<FormApiController> _logger;

        public FormApiController(ILogger<FormApiController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public Boolean Post([FromBody]PassCode pass)
        {
            return Password == pass.Pass;
        }
    }
}
