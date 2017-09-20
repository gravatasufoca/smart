function ucFirst(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function resolve(names) {
    return {
        load: ['$q', '$rootScope', function ($q, $rootScope) {
            var defer = $q.defer();
            require(names, function () {
                defer.resolve();
                $rootScope.$apply();
            });
            return defer.promise;
        }]
    }
}
function retira_acentos(palavra) {
    com_acento = "\u00E1\u00E0\u00E3\u00E2\u00E4\u00E9\u00E8\u00EA\u00EB\u00ED\u00EC\u00EE\u00EF\u00F3\u00F2\u00F5\u00F4\u00F6\u00FA\u00F9\u00FB\u00FC\u00E7\u00C1\u00C0\u00C3\u00C2\u00C4\u00C9\u00C8\u00CA\u00CB\u00CD\u00CC\u00CE\u00CF\u00D3\u00D2\u00D5\u00D6\u00D4\u00DA\u00D9\u00DB\u00DC\u00C7";
    sem_acento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
    nova = "";
    for (i = 0; i < palavra.length; i++) {
        if (com_acento.search(palavra.substr(i, 1)) >= 0) {
            nova += sem_acento.substr(com_acento.search(palavra.substr(i, 1)), 1);
        }
        else {
            nova += palavra.substr(i, 1);
        }
    }
    return nova;
}


//////////////////////////////////////////////////////// UTILIDADES
/**
 * Plugin para verificar se uma determinada string contem dado valor
 */
String.prototype.contains = function (c) {
    if (c) {
        return this.indexOf(c) !== -1;
    } else {
        return 0;
    }
};

function Geral() {
    String.prototype.replaceAll = function (from, to) {
        var escapeRegExp = function escapeRegExp(string) {
            return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        };

        return this.replace(new RegExp(escapeRegExp(from), 'g'), to)
    };

    /**
     * Verifica se um valor é considerado vazio
     */
    Geral.prototype.isEmpty = function (valor, zeroIsEmpty) {
        if (valor === undefined) {
            return true;
        } else if (valor === null) {
            return true;
        } else if (typeof valor == 'number') {
            if (zeroIsEmpty && zeroIsEmpty === true && valor === 0) {
                return true;
            }
        } else if (typeof valor === 'string' && valor.contains("R$")) { //string real
            if (zeroIsEmpty && zeroIsEmpty === true && valor.realToFloat() === 0) {
                return true;
            }
        } else if (typeof valor === 'string' || Object.prototype.toString.call(valor) === '[object Array]') { //data oou string
            if (valor.length == 0) {
                return true;
            }
        }

        return false;
    };

}

window.geral = new Geral();

