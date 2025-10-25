using System;
using DDDSample1.Domain.Shared;
<<<<<<< HEAD
using Newtonsoft.Json;
=======
>>>>>>> c86068a5f4621245df15c19cdf6cf8d2f12c7fab

namespace DDDSample1.Domain.VesselTypes
{
    public class VesselTypeId : EntityId
    {
<<<<<<< HEAD
        [JsonConstructor]
        public VesselTypeId(Guid value) : base(value)
        {
        }

        public VesselTypeId(String value) : base(value)
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
=======
        public VesselTypeId(Guid value) : base(value) { }
        public VesselTypeId(string value) : base(value) { }

        protected override object createFromString(string text) => new Guid(text);
        public override string AsString() => ((Guid)ObjValue).ToString();
        public Guid AsGuid() => (Guid)ObjValue;
    }
}

>>>>>>> c86068a5f4621245df15c19cdf6cf8d2f12c7fab
