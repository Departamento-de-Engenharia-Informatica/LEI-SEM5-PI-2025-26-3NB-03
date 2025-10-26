using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Staff
{
    public sealed class StaffMemberId : EntityId
    {

        public StaffMemberId() : base(Guid.NewGuid().ToString()) { }


        public StaffMemberId(string value) : base(value) { }

        public override string AsString()
            => (string)base.Value;


        protected override object createFromString(string text)
            => text;
    }
}

