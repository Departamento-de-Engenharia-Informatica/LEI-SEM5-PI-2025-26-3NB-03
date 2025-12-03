using DDDSample1.Domain.Qualifications;

namespace DDDSample1.Domain.PhysicalResources
{
    public class PhysicalResourceQualification
    {
        public PhysicalResourceId PhysicalResourceId { get; set; }
        public PhysicalResource PhysicalResource { get; set; }

        public string QualificationCode { get; set; }
        public Qualification Qualification { get; set; }

        public PhysicalResourceQualification() { }

        public PhysicalResourceQualification(PhysicalResourceId physicalResourceId, string qualificationCode)
        {
            PhysicalResourceId = physicalResourceId;
            QualificationCode = qualificationCode;
        }
    }
}
