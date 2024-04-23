This repo demonstrates: 

* how you can write custom effectors and use them on a local network, where you can whitelist them yourself. 
* the use of Pinata to down- and upload folders with files to and from the particle vault. Using Pinata gateways has the benefit of your content being well indexed and available everywhere.Especially when developing on a local network, it can be convenient to keep your data somewhere persistent. 


```
fluence update --version 0.15.28
fluence local up
fluence deploy
```

### Provision ipfs peer 
You may want to get the archive onto your local networks ipfs peer. The default ipfs effector has a short timeout set. 
```
docker exec -ti fluence-ipfs-1 ipfs get bafybeiamh4td3vg25zlgcw7pybudtxbmkidsqx7lbv5zvodfa4kjsn66dq
```

### run the test 

```
fluence run -f 'test()'
```

Our aqua script will be downloading a contentadressed folder of files from a Pinata gateway into the partcile vault, then log its contents, and then re-upload them to Pinata. The returned CID should be equal to the archive cid. 

