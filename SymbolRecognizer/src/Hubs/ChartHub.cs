using Microsoft.AspNetCore.SignalR;
using SymbolRecognizer.Data;

namespace SymbolRecognizer.Hubs
{
    public class ChartHub:Hub
    {
        public async Task BroadcastChartData(List<ChartModel> data) =>
       await Clients.All.SendAsync("broadcastchartdata", data);
    }
}
