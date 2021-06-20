const IPCIDR = require("ip-cidr");
const ipaddr = require('ipaddr.js');

function getNextFreeAddress(address, inUse) {
    if(!IPCIDR.isValidAddress(address)) {
        return;
    }

    const cidr = new IPCIDR(address);
    const ipList = cidr.toArray({ from: 2, limit: (inUse.length+1) });
    // IP Addresses (especially IPv6) needs to be normalized
    inUse = inUse.map((addr) => ipaddr.parse(addr).toNormalizedString());

    for (var i=0; i<ipList.length;i+=1) {
        if ( ipList.hasOwnProperty(i) ) {
            var ip = ipaddr.parse(ipList[i]).toNormalizedString();

            if ( inUse.indexOf(ip) === -1 ) {
                return ip;
            }
        }
    }

    return null;
}

module.exports = {
    getNextFreeAddress
};