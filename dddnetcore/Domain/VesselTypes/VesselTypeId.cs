using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.VesselTypes
{
    public class VesselTypeId : EntityId
    {
        public VesselTypeId(Guid value) : base(value) { }
        public VesselTypeId(string value) : base(value) { }

        protected override object createFromString(string text) => new Guid(text);
        public override string AsString() => ((Guid)ObjValue).ToString();
        public Guid AsGuid() => (Guid)ObjValue;
    }
}

