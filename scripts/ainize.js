const Ainize = require("@ainize-team/ainize-js").default;

const { AINIZE_PRIVATE_KEY } = require('../env');

const deployerPrivKey = AINIZE_PRIVATE_KEY;
const userPrivKey = AINIZE_PRIVATE_KEY;
const serviceName = process.env.SERVICE_NAME;
const serviceUrl = process.env.SERVICE_URL;

const deployService = async () => {
  const ainizeAdmin = new Ainize(0);
  await ainizeAdmin.login(deployerPrivKey)
  const adminAddress = await ainizeAdmin.getAddress();
  await ainizeAdmin.deploy({
    serviceName: serviceName,
    serviceUrl: serviceUrl,
    billingConfig: {
      depositAddress: adminAddress,
      minCost: 0,
      costPerToken: 0,
    },
  });
  await ainizeAdmin.logout();
}

const deposit = async (amount) => {
  const ainize = new Ainize(0);
  await ainize.login(userPrivKey);
  const service = await ainize.getService(serviceName);
  const result = await service.chargeCredit(amount);
  console.log('deposit result :>> ', result);
  await ainize.logout();
}

const request = async (requestData) => {
  const ainize = new Ainize(0);
  await ainize.login(userPrivKey);
  const service = await ainize.getService(serviceName);
  const result = await service.request(requestData);
  console.log('request result :>> ', result);
  await ainize.logout();
}

const usage = () => {
  console.log('\nExample commandlines:\n  node scripts/ainize.js request\n');
  process.exit(0);
}

const processArguments = async () => {
  if (process.argv.length !== 3) {
    usage();
  }

  const job = process.argv[2];

  switch (job) {
    case 'deploy':
      await deployService();
      break;
    case 'deposit':
      // NOTE(from ainize team): deployService 에서 minCost 0으로 세팅한 경우 deposit 필요 X
      await deposit(30);
      break;
    case 'request':
      const requestData = { jobType: 'list_assistants', limit: 2 };
      const retrieveData = {
        jobType: "retrieve_assistant",
        assistantId: "asst_IqEmckNBdn32eyF7qXEczTYz"
      };
      const deleteData = {
        "jobType": "delete_assistant",
        "assistantId": "asst_GTOQjV4pnd9IRZ7lT0MNsr9P"
      }
      await request(requestData);
      break;
    default:
      throw new Error(`Wrong job(${job}) has been specified. `);
  }
}

processArguments();
