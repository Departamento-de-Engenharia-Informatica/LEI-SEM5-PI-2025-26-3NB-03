namespace DDDSample1.Domain.Qualifications
{
    public class CreateQualificationDto
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
    }

    public class UpdateQualificationDto
    {
        public string Name { get; set; }
    }

    public class QualificationViewDto
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
