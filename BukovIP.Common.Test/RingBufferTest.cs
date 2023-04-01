using FluentAssertions;
using BukovIP.Common.Data;
using System;
using Xunit;

namespace BukovIP.Common.Test
{
    public class RingBufferTest
    {
        [Fact]
        public void GodTest()
        {
            var rb = new RingBuffer<int>(3);
            rb.Capacity.Should().Be(3);
            rb.Length.Should().Be(0);

            rb.Add(1);
            rb.Length.Should().Be(1);
            rb.IsFul.Should().BeFalse();

            rb.Add(2);
            rb.Length.Should().Be(2);
            rb.IsFul.Should().BeFalse();

            rb.Add(3);
            rb.Length.Should().Be(3);
            rb.IsFul.Should().BeTrue();

            rb.Add(4);
            rb.Length.Should().Be(3);
            rb.IsFul.Should().BeTrue();

            rb.Capacity.Should().Be(3);

            //state 2,3,4

            rb[0].Should().Be(2);
            rb[1].Should().Be(3);
            rb[2].Should().Be(4);

            rb.Sum(p => p).Should().Be(9);
            rb.Average(p => p).Should().Be(3);

            var act = () => rb[3];
            act.Invoking(p => p.Invoke()).Should().Throw<ArgumentOutOfRangeException>();
        }
    }
}