# Swiv Map service - Google Enhanced Ecommerce - Insite

This is the Insite mapper for Google Enhanced Ecommerce.


## Service

The main module singleton is the MapperService. It handles all the mapping tasks within Google Enhanced Ecommerce events scopes.
It will be called by Swiv when a Google Enhanced Ecommerce event is triggered.
The service itself is only a manager: it calls the appropriate mapper depending of the event.


## Mappers

There are three mappers defined within the module.
- Product
- Promotion
- ActionField

### Product
The product mapper will handle any ProductDto and convert it to a Google Enhanced Ecommerce object.
If there are more than a single product, it will handle the whole collection and return a mapped collection.

### Promotion
TBD

### ActionField
TBD
