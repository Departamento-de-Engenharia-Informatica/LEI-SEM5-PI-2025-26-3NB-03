using System;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DDDSample1.Infrastructure.Shared
{
    /// Converte IDs fortes (derivados de EntityId) <-> string para EF Core
    public sealed class EntityIdValueConverter<TId> : ValueConverter<TId, string> where TId : EntityId
    {
        public EntityIdValueConverter(ConverterMappingHints mappingHints = null)
            : base(
                id => id.AsString(),                          // para provider (string)
                text => (TId)Activator.CreateInstance(        // de volta para o tipo forte
                    typeof(TId),
                    new object[] { text }
                ),
                mappingHints
            )
        { }
    }
}
