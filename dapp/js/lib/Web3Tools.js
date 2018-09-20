var web3;
var currAccount;
var accs;


function web3Connect(url) {
	if(typeof web3 === 'undefined')
	web3 = new Web3(new Web3.providers.HttpProvider(url || 'http://localhost:8545'));
    BigNumber = web3.BigNumber;
}

function accounts() {
	return web3.eth.accounts;
}

function balance(addr) {
	return web3.eth.getBalance(addr);
}

function block(num) {
    return web3.eth.getBlock(num);
}

function toEther(num) {
    if (!(num instanceof BigNumber)) num = new BigNumber(num.toString());
    return web3.fromWei(num).toFormat(4);
}

function toWei(num) {
    return web3.toWei(num);
}

function fromDecimal(num, shift) {
    return new BigNumber(num).mul(10**shift).toNumber();
}

function toDecimal(num, shift) {
    return new BigNumber(num).div(10**shift).toNumber();
}

function toDate(num) {
    if (num instanceof BigNumber) num = num.toNumber();  
    return new Date(num * 1000).toString();  
}

function setAccount(acc) {
    currAccount = acc;
}

function isAddr(addr) {
	return web3.isAddress(addr);
}

function notAddr(addr) {
	return !web3.isAddress(addr);	
}

function shortenAddr(addr) {
	return `${addr.slice(0,8)}...${addr.slice(-6)}`;
}

function checksumAddr(addr) {
    return web3.toChecksumAddress(addr);
}

function utf8(hex) {
	return web3.toUtf8(hex);
}

function blockie(addr, scale = 5) {
	return !addr ? '' : blockies.create({seed:addr.toLowerCase(), size:8, scale:scale}).toDataURL();
}

function txcb(e, receipt){
    console.log(e, receipt);
    if(e) {
        txErr(e);
    }
    if (typeof receipt !== 'undefined') {
        txReceipts[receipt] = {
            itvlId: setInterval(()=>{txWait(receipt, txrReport)}, 1000)
        }
        txLodge(receipt);
    }
}

function txErr(e) {
    console.log(e);
    var txList = $id("tx-list");
    var txDiv = document.createElement("div");
    txDiv.innerHTML = `<span>${e}</span>`
    txList.appendChild(txDiv);
}

function txWait(receipt, cb) {
    txr = web3.eth.getTransaction(receipt);
    if (txr.blockNumber != null) {
        console.log(`TX ${receipt} mined in block: ${txr.blockNumber}`);
        clearInterval(txReceipts[receipt].itvlId);
        delete txReceipts[receipt].itvlId;
        cb(receipt);
    }
}

function txLodge(receipt) {
    var txList = $id("tx-list");
    var txTr = document.createElement("tr");
    txTr.classList.add("mono");
    txTr.innerHTML = `
        <td><a href="https://etherscan.io/tx/${receipt}">${receipt}</a></td>
        <td class="pure-u-1-5" id=${receipt}>waiting...</td>
        `;
    txList.appendChild(txTr);
}

function txrReport(receipt) {
    var txr = web3.eth.getTransaction(receipt);
    var txTd = $id(receipt);
    txReceipts[receipt].receipt = txr;
    txTd.innerHTML = `mined in block ${txr.blockNumber}`;
}


function sha3(str, opt) {
  return "0x" + web3.sha3(str, opt).replace("0x", "");
};

web3Connect();
currAccount = accounts()[0];


console.log("ran Web3Tools.js");
