using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.VesselVisitNotifications
{
    public class VvnId : EntityId
    {
        public VvnId(Guid value) : base(value) { }
        public VvnId(string value) : base(value) { }

        protected override object createFromString(string text) => new Guid(text);
        public override string AsString() => ((Guid)ObjValue).ToString();
        public Guid AsGuid() => (Guid)ObjValue;
    }
}
