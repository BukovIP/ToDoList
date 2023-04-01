using System.Linq;

namespace BukovIP.Common.Data
{
    public class RingBuffer<T> : IRingBuffer<T>
    {
        private readonly T[] _buffer;
        private int _head = 0;
        private int _tail = 0;
        private bool _isFul = false;

        public int Length { get { return _isFul ? _buffer.Length : _head; } }
        public int Capacity { get { return _buffer.Length; } }
        public bool IsFul => _isFul;

        public RingBuffer(T[] buffer)
        {
            _buffer = new T[buffer.Length];
            buffer.CopyTo(_buffer, 0);
        }

        public RingBuffer(int length)
        {
            _buffer = new T[length];
        }

        public T this[int i]
        {
            get
            {
                if(i<0|| i>=Capacity)
                    throw new ArgumentOutOfRangeException(nameof(i));

                var pos = (i + _tail) % Capacity;
                return _buffer[pos];
            }
        }

        public void Add(T value)
        {
            _head = _head++ % Capacity;

            if (!_isFul && _head == Capacity - 1)
                _isFul = true;

            if (_isFul)
                _tail = _tail++ % Capacity;

            _buffer[_head] = value;
        }

        public decimal? Sum(Func<T, decimal> selectior) => _buffer.Sum(selectior);

        public decimal? Average(Func<T, decimal> selectior) => _buffer.Average(selectior);

    }
}
