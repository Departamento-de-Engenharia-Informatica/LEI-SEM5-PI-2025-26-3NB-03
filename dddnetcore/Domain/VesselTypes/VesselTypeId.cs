using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.VesselTypes
{
    public class VesselTypeId : EntityId
    {
        [JsonConstructor]
        public VesselTypeId(Guid value) : base(value) { }

        public VesselTypeId(string value) : base(value) { }

        override protected object createFromString(string text) => new Guid(text);

        override public string AsString() => ((Guid)base.ObjValue).ToString();

        public Guid AsGuid() => (Guid)base.ObjValue;
    }
}
