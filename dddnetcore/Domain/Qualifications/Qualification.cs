using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Qualifications
{
    public class Qualification : Entity<QualificationId>
    {
        public string Code { get; private set; }   // único
        public string Name { get; private set; }

        private Qualification() { } // EF

        private Qualification(string code, string name)
        {
            if (string.IsNullOrWhiteSpace(code))
                throw new BusinessRuleValidationException("Qualification code is required.");
            if (string.IsNullOrWhiteSpace(name))
                throw new BusinessRuleValidationException("Qualification name is required.");

            Id   = new QualificationId();
            Code = code.Trim();
            Name = name.Trim();
        }

        public static Qualification Create(string code, string name) =>
            new Qualification(code, name);

        public void Rename(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new BusinessRuleValidationException("Qualification name is required.");
            Name = name.Trim();
        }
    }
}
