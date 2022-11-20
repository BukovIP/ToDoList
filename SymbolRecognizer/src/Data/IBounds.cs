namespace SymbolRecognizer.Data
{
    public interface IBounds
    {
        int MinX { get; set; }
        int X { get; }
        int MinY { get; set; }
        int Y { get; }
    }

    public class Bounds : IBounds
    {
        public int MinX { get; set; }
        public int X { get; set; }
        public int MinY { get; set; }
        public int Y { get; set; }
    }
}
