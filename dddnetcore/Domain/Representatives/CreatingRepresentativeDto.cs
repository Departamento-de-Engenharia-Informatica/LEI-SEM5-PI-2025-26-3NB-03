namespace DDDSample1.Domain.Representatives
{
    public class CreatingRepresentativeDto
    {
        public string Name { get; set; }
        public string Nationality { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }

        public CreatingRepresentativeDto(string name, string nationality, string email, int phonenumber)
        {
            this.Name = name;
            this.Nationality = nationality;
            this.Email = email;
            this.PhoneNumber = phonenumber;
        }
    }
}