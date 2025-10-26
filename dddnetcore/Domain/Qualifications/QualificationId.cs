using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Qualifications
{
    public class QualificationId : EntityId
    {
        // o EntityId base espera string
        public QualificationId() : base(Guid.NewGuid().ToString()) { }

        // construtor para quando vier como string
        public QualificationId(string value) : base(value) { }

        public override string AsString()
        {
            return (string) base.Value;
        }

        // o EntityId chama isto para recriar o Value a partir de texto
        // como o Value é string, devolvemos o próprio texto
        protected override object createFromString(string text)
        {
            return text;
        }
    }
}
