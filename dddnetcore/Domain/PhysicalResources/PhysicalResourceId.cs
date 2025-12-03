using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.PhysicalResources
{
    public class PhysicalResourceId : EntityId
    {
        [JsonConstructor]
        public PhysicalResourceId(Guid value) : base(value)
        {
        }

        public PhysicalResourceId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }

        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}