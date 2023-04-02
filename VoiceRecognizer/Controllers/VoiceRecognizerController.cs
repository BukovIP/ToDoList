using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VoiceRecognizer.data;

namespace VoiceRecognizer.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoiceRecognizerController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Recognize([FromBody] AudioRecognizerRequest request)
        {
            var points = Array.Empty<Point>();
            return  await Task.FromResult(Ok(points));
        }
    }
}