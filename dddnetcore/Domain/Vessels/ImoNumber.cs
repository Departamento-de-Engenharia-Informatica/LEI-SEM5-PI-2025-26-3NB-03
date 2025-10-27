using System;
using System.Text.RegularExpressions;

namespace DDDNetCore.Domain.Vessels.ValueObjects
{
    public class ImoNumber
    {
        private static readonly Regex ImoRegex = new Regex(@"^\d{7}$");

        public string Value { get; private set; }

        // Construtor Vazio
        protected ImoNumber() { }

        public ImoNumber(string imoNumber)
        {
            if (string.IsNullOrWhiteSpace(imoNumber))
            {
                throw new ArgumentException("IMO Number cannot be empty.", nameof(imoNumber));
            }

            // Remove o prefixo "IMO " se existir
            string cleanImo = imoNumber.Replace("IMO ", "").Trim();

            if (!ValidateImoChecksum(cleanImo))
            {
                throw new ArgumentException($"IMO Number '{imoNumber}' is invalid (checksum failed).", nameof(imoNumber));
            }

            this.Value = cleanImo;
        }

        // Lógica de Validação do Dígito de Controlo (Check Digit)
        private static bool ValidateImoChecksum(string imo)
        {
            if (!ImoRegex.IsMatch(imo))
            {
                // Não tem 7 dígitos
                return false;
            }

            // O dígito de controlo é o último dígito (posição 7)
            int checkDigit = int.Parse(imo.Substring(6, 1));
            int sum = 0;

            // Multiplica os primeiros 6 dígitos por pesos de 7 a 2
            for (int i = 0; i < 6; i++)
            {
                int digit = int.Parse(imo.Substring(i, 1));
                int weight = 7 - i;
                sum += digit * weight;
            }

            // O dígito de controlo deve ser igual ao último dígito da soma
            return (sum % 10) == checkDigit;
        }

        public override string ToString()
        {
            return $"IMO {Value}";
        }

        // Métodos de comparação para Value Objects (Equals e GetHashCode)
        public override bool Equals(object obj)
        {
            return obj is ImoNumber other && Value.Equals(other.Value);
        }

        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }
    }
}
