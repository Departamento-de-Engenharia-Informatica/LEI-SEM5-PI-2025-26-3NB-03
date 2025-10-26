using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Docks
{
    public class DockId : EntityId
    {
        [JsonConstructor]
        public DockId(Guid value) : base(value) { }

        public DockId(string value) : base(value) { }

        override protected object createFromString(string text) => new Guid(text);

        override public string AsString() => ((Guid)base.ObjValue).ToString();

        public Guid AsGuid() => (Guid)base.ObjValue;
    }
}
