namespace SymbolRecognizer.Data
{
    public interface IRingBuffer<T>
    {
        void Add(T item);
        decimal? Sum(Func<T, decimal> func);
        decimal? Average(Func<T, decimal> func);
    }
}
