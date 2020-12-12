using Demo.JsonAjax.Api.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Demo.JsonAjax.Api.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private static List<ChatMessage> _allMessages = new List<ChatMessage>()
        {
            new ChatMessage()
            {
                Nickname = "System",
                Message = "Server is up!"
            }
        };

        [HttpGet]
        public IEnumerable<ChatMessage> Get()
        {
            return _allMessages;
        }

        [HttpPost]
        public void Post([FromBody] ChatMessage chatMessage)
        {
            _allMessages.Add(chatMessage);       }
    }
}
