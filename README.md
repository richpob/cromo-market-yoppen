# Proyecto Yoppen y Compra de Cromos

El Proyecto Yoppen busca innovar en el espacio de las criptomonedas, combinando tecnología blockchain avanzada con una visión de inclusión y comunidad. Este repositorio contiene el código fuente de la criptomoneda Yoppen (YPN), la estructura de su Oferta Inicial de Monedas (ICO) y el intercambio descentralizado (DEX) asociado.

## Introducción

Yoppen es una criptomoneda diseñada para promover la conectividad y el apoyo dentro de su comunidad de usuarios. Inspirada en valores de cooperación y solidaridad, Yoppen busca ser más que una moneda digital: un movimiento hacia transacciones más justas y equitativas.

Para el nombre de la criptomoneda "Yoppen", inspirado en el vocabulario Selk'nam que significa "amigo" o "compañero", podríamos proponer un acrónimo y símbolo que reflejen tanto la herencia cultural como la naturaleza innovadora de la criptomoneda.

### Acrónimo: YPN
"YPN" captura las iniciales de "Yoppen" y lo condensa en una forma fácil de recordar y usar en comunicaciones digitales. Este acrónimo es corto, lo que facilita su uso en el mercado de criptomonedas, donde la simplicidad y la facilidad de recordación son claves para la adopción y el reconocimiento.

### Símbolo: ⓨ
Como símbolo, propongo utilizar "ⓨ", que es la letra "Y" dentro de un círculo. Esta representación visual hace referencia a la inicial de "Yoppen" y la inclusión en un círculo puede simbolizar la unidad, comunidad y la idea de globalidad, valores importantes para la criptomoneda inspirada en el concepto de amistad y cooperación. Además, el uso de un círculo es una práctica común en logotipos y símbolos para transmitir inclusión y totalidad.

Estas propuestas de acrónimo y símbolo buscan combinar la relevancia cultural del término "Yoppen" con la funcionalidad y el diseño requerido para una identificación clara en el ecosistema de criptomonedas.

### Imagen de Yoppen

<img src="https://github.com/richpob/MiCryptoCoins-ICo-DEX/assets/133718913/1676f7ed-79dd-46e4-b36e-65899a231731" width="100" height="100">


## Características

- **Token ERC-20:** Yoppen utiliza el estándar ERC-20 para garantizar la compatibilidad con la amplia gama de infraestructuras Ethereum.
- **ICO Trustless:** Una ICO descentralizada permite a los inversores participar de manera segura y transparente.
- **DEX Integrado:** La plataforma incluye un DEX para facilitar el intercambio de Yoppen por otras criptomonedas sin intermediarios.

## Tecnologías Utilizadas

- [Solidity](https://soliditylang.org/)
- [OpenZeppelin](https://openzeppelin.com/)
- [Remix IDE](https://remix.ethereum.org/)
- [Web3.js](https://web3js.readthedocs.io/)

## Estructura del Repositorio

- `contracts/` - Contiene los contratos inteligentes de Yoppen, ICO y DEX.
- `migrations/` - Scripts de migración para desplegar los contratos en la red Ethereum.
- `tests/` - Pruebas automatizadas para validar la lógica de los contratos.

## Desarrollo

Para comenzar a trabajar con el proyecto, clona este repositorio y sigue los pasos a continuación para instalar las dependencias y compilar los contratos.
![image](https://github.com/richpob/MiCryptoCoins-ICo-DEX/assets/133718913/c02f1784-68e5-4ea8-890e-a2bb7bcdabfb)

Luego usando Visual Code Studio, creamos los códigos del proyecto

![image](https://github.com/richpob/MiCryptoCoins-ICo-DEX/assets/133718913/6eb783c2-9162-43b7-899e-1dfde1d314fc)


## Contribuir
Si estás interesado en contribuir al proyecto Yoppen, por favor lee CONTRIBUTING.md para más información sobre cómo empezar.

## Licencia
Este proyecto está bajo la licencia MIT. Ver LICENSE para más detalles.

## Contacto
Para más información, por favor contacta a richard.poblete@hotmail.com.

# Creación de Token ERC20 YoppenToken

## Descripción
`YoppenToken` es un token ERC-20 desarrollado en Solidity que incorpora varias extensiones de la librería OpenZeppelin para proporcionar funcionalidades avanzadas como quema de tokens, pausabilidad y permisos. Este token ha sido diseñado para ser utilizado en la red de prueba Sepolia de Ethereum, facilitando una amplia gama de operaciones financieras descentralizadas.
## Código fuente Solidity de Toekn ERC Yoppen
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";


contract YoppenToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit {
    constructor(address initialOwner)
        ERC20("Yoppen", "YPN") 
        Ownable(initialOwner)
        ERC20Permit("Yoppen") {
        _mint(msg.sender, 1000000 * 10 ** decimals()); // Emite 1,000,000 YPN al desplegar el contrato
    
  }
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}

```

## Características
- **ERC20**: Estándar básico para la creación de tokens intercambiables en la red Ethereum.
- **ERC20Burnable**: Permite a los titulares de tokens destruir (quemar) sus tokens, reduciendo el suministro total.
- **ERC20Pausable**: Introduce la capacidad de pausar y despausar las transferencias de tokens, lo que puede ser útil en situaciones de emergencia o mantenimiento.
- **Ownable**: Restringe ciertas acciones solo al propietario del contrato, como la emisión de nuevos tokens o la pausa del contrato.
- **ERC20Permit**: Permite a los usuarios realizar transacciones sin pagar gas, firmando una autorización.

## Funciones Principales
- **constructor(address initialOwner)**: Establece el nombre y símbolo del token, el propietario inicial y habilita los permisos según el estándar ERC20Permit.El constructor del contrato crea el token con el nombre "Yoppen" y el símbolo "YPN", y acuña inicialmente 1,000,000 de tokens para el creador del contrato. La función mint permite al propietario del contrato acuñar más tokens en el futuro.
- **pause()**: Pausa todas las transferencias de tokens.
- **unpause()**: Reanuda todas las transferencias de tokens.
- **mint(address to, uint256 amount)**: Permite al propietario del contrato acuñar nuevos tokens a una dirección específica.
- **_update(address from, address to, uint256 value)**: Sobrescribe las funciones de actualización de balances de tokens para ser compatibles con la pausabilidad.

## Despliegue
El contrato `YoppenToken` fue creado utilizando Visual Studio Code, compilado y desplegado a través de Remix, integrado con MetaMask y utilizando una cuenta de la red de prueba Sepolia.

## Licencia
Este proyecto está bajo la licencia MIT.

## Resultado del despliegue en Renix Yoppen Token ERC20

- URL del Token Yoppen https://sepolia.etherscan.io/address/0x38bc18ae393a7e560f8c26c1490f06d0ee069b73 

- URL Contrato CromoMarket https://sepolia.etherscan.io/address/0x265d37eB5f8D9998cBA2E83Ba0C0Da6E9C5431f8



### Imagen del contrato Toekn ERC20
![image](https://github.com/richpob/MiCryptoCoins-ICo-DEX/assets/133718913/5117aa31-6647-47ed-81d6-dc295f911b5c)

### Cartera de Metamak con Token Yoppen
![image](https://github.com/richpob/MiCryptoCoins-ICo-DEX/assets/133718913/7c403316-33c9-475f-bc82-35b24f09143f)

### Cuenta asignada a Yoppen Token
![image](https://github.com/richpob/MiCryptoCoins-ICo-DEX/assets/133718913/2a879c77-e41e-42ee-8327-5b7bcd589a8a)

