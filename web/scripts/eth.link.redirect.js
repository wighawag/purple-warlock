/*
fetch("https://mainnet.infura.io/v3/bc0bdd4eaac640278cdebc3aa91fabe4", {method: "POST", body: JSON.stringify({id: 1, method: "eth_chainId", params:[]})}).then(v=>v.json())

//node (jolly-roger.eth)
0xc57b1021c48d95fc3bec86ad36a19d0de5692680f571969eaf22ab1f8e6f69cf

// hash
0xe30101701220f551f87be3fd206ad57afc03b4dc963e5a0ff50996f4e4a8e0d6d0a8b2e39fc7


fetch("https://mainnet.infura.io/v3/bc0bdd4eaac640278cdebc3aa91fabe4", {method: "POST", body: JSON.stringify({jsonrpc: "2.0", id: "3", method: "eth_call", params:[{to:"0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41", data:"0xbc1c58d1c57b1021c48d95fc3bec86ad36a19d0de5692680f571969eaf22ab1f8e6f69cf"}, "latest"]})}).then(v=>v.json())



"0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000026e30101701220f551f87be3fd206ad57afc03b4dc963e5a0ff50996f4e4a8e0d6d0a8b2e39fc70000000000000000000000000000000000000000000000000000"


e30101701220f551f87be3fd206ad57afc03b4dc963e5a0ff50996f4e4a8e0d6d0a8b2e39fc7
=
storage system: IPFS (0xe3)
CID version: 1 (0x01)
content type: dag-pb (0x70)
hash function: sha2-256 (0x12)
hash length: 32 bytes (0x20)
hash : f551f87be3fd206ad57afc03b4dc963e5a0ff50996f4e4a8e0d6d0a8b2e39fc7

a) e3010170 
b) 1220
c) f551f87be3fd206ad57afc03b4dc963e5a0ff50996f4e4a8e0d6d0a8b2e39fc7



b+c = 1220f551f87be3fd206ad57afc03b4dc963e5a0ff50996f4e4a8e0d6d0a8b2e39fc7 =  QmerH6DVy1pXUMwg3D2FnnrknMneDkoySazER4iLYZi1pS

url = "https://b" + base32(contenthash.minus("e301")) + ".ipfs.dweb.link/";

*/

const result =
  '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000026e30101701220f551f87be3fd206ad57afc03b4dc963e5a0ff50996f4e4a8e0d6d0a8b2e39fc70000000000000000000000000000000000000000000000000000';
const hash = result.slice(130, 134).toLowerCase() === 'e301' && result.slice(134, 206);
if (hash) {
  const a = 'abcdefghijklmnopqrstuvwxyz234567';
  const h = new Uint8Array(hash.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
  const l = 36;
  let b = 0;
  let v = 0;
  let o = '';
  for (let i = 0; i < l; i++) {
    v = (v << 8) | h[i];
    b += 8;
    while (b >= 5) {
      o += a[(v >>> (b - 5)) & 31];
      b -= 5;
    }
  }
  if (b > 0) {
    o += a[(v << (5 - b)) & 31];
  }
  const url = 'https://b' + o + '.ipfs.dweb.link/';
  console.log({url});
}
