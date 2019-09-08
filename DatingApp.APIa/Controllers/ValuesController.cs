using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.APIa.DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.APIa.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext context;

        public ValuesController( DataContext context)
        {
            this.context = context;
        }


        [HttpGet("users")]
        public async Task<IActionResult> GetUser()
        {
            var users = await context.Users.Select(x=>x.Username).ToListAsync();

            return Ok(users);
        }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var values = await context.Values.ToListAsync();

            return Ok(values);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int id)
        {
            var currentValue = await context.Values.FirstOrDefaultAsync(x => x.Id == id);

            return Ok(currentValue);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
