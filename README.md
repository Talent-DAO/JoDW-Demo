# Talent DAO

![Screen Shot 2022-02-02 at 10 09 12 AM](https://user-images.githubusercontent.com/9419140/152180798-8e9f7052-8799-4ea7-94f9-d9423ee26035.png)

## Journal of Decentralized Work Website and Contracts

>Contributors Start Here

To run locally on your machine for development follow the steps below:
```
git clone https://github.com/Talent-DAO/JoDW-Demo.git app
```
Navigate to the `/app` directory or whatever you chose to name it (it is the root directory of the monorepo).

`yarn install` should run automatically using the .husky file (this can be updated to suit your needs)
and if it happens to not cooporate, just run `yarn install` manually.

Next, you'll want to open up a new terminal window (whether in your VS Code, other IDE, or any terminal program) and run `yarn chain`. This will fire up a local blockchain for the application to connect to.

Once your local chain in up and running you can deploy the contracts locally using `yarn deploy` the default network is set in `/app/packages/hardhat/hardhat-config.js`

And finally, after your contracts are deployed you can run `yarn start` to fire up the front end.

### Have Fun 🥳

---

>Partners

We have partnered with the following protocols to buidl the next generation of decentralized social publishing and review system.

- [Arweave](https://www.arweave.org/)
- [Orange Protocol](https://app.orangeprotocol.io/)
- [Polygon DAO](https://polygon.community/#/)

Currently working on partnerships with [Radicle](https://radicle.xyz/) 🌱 and [Lens](https://lens.xyz) Protocol 🌿

---

>Contact Us

Please share your feedback with us!
- [Discord](https://discord.gg/NgDBqSdejh)
- [Telegram](https://t.me/+CKdqe_z_vmAwOTk5)
