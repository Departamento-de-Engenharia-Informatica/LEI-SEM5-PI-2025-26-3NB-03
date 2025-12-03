using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Representatives
{
    public class RepresentativeId : EntityId
    {
        [JsonConstructor]
        public RepresentativeId(string value) : base(value)
        {
        }

        override
        protected object createFromString(string text)
        {
            return text;
        }

        override
        public string AsString()
        {
            return base.ObjValue.ToString();
        }
    }
}