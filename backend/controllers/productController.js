import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";


import fbAdmin from 'firebase-admin';

// ================= Import from Firebase =========================

const getProducts = asyncHandler(async (req, res) => {
  try {

    fbAdmin.initializeApp({
      credential: fbAdmin.credential.cert({
        "type": "service_account",
        "project_id": "shopdemo-a2b23",
        "private_key_id": "271443c0de68f30b1a89513bcc24c2ba91662055",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDd0WNf9G3NKTsj\nbOJrimd0NQ7t0jIZlvAWcf+8KSHYNSVcPXLLp37bkvZmJLMo40KQkzBqaYY2RjhA\nZv84oiJ1ThcCa6Y98Q8i2bbh5rL4iuWwUQD38b+vHeRD127hJhy9ZSe3IhO+lRb7\nffSjcc8WqdPc83kMRdwxyq/wV541P+qvAiGUl25Yg+1Sgn23LRZ/14dUCvyenPLi\n+Z7xmBLXtVQNVLPY2ycEtZRtpevM31CdXbbWPSkaCS503gpDDXkIrGq/anYWtJQX\nsAtikZVU9ElOpYeFMfmCObCUmF4Jp2dTXJlSSgpz1J9sFPVpVRiHX4L7JhCVTqLV\nnBqQx7ThAgMBAAECggEAAIbcgjQaGD1e5BBrEv5El8GUwLmMd963C3bvYzIIkAXe\ndL3as6to7+fv4inCsRVwQU2ahRqC2JFcVWGn6A7hWgdCrcVQTd07F/NzCuMtsC0M\ncGRShj7j7Ew75ZyZpABKJmRq1qAGnUUyFVcHrW/yB0ZwL9oWQseuHGzpc9lcbAP9\nm+4WTPQxi9BNS891UjD/BQY1yMjJk4ULUg13V489rt3O9Y0xipobEibPUfNdknel\nF4sKcbMpGKinNFodOeqhDvpmisHF6OMfEvVB/KQCQBoJ57xT94f5sEPk53YtAOG8\noCP2gjjTpnu2KWONpAXy5R5u6he7BqaaihaUeb+tEQKBgQDxLI0W6qF6fczx73l0\nMBaT+V3Z+AL1e2g3MOYICdLI+cDaCgDrdRoroU1ZCbUKvNU+6UquBQte841c/5pq\ncGRtRBgmguM0WQJuPQe581kuG3/OZSxwW8PVZOS9YWc8c+NQBjzwiILRpqyvOyTA\n4h0usGyxF1Hgv1Kb0QOZ+7W50QKBgQDrdDj4pCUruuRObw4qn0WWMc20FbPlDUiH\nCoZZA2O2LQ3y5K6smAHNfolGyJ3z4BZOqVYdFWq7Z5+2uOUPGiMKA+a2FScSmgrk\nPdNGdxMG7VIQ2n3//WzR/rMBWV6gCLWnLgB40f+gu9bMWu/zbzAZJvezCtMikIUe\n3BpMkwn+EQKBgQDgrT5rgP4aXSQWp6AgK8R86i0SqMgo5WS7NeS2zGAANxwAhJ1C\nvX858jVao35zmGOZDkEySSTEumSRpNW4HyiP2oYdKoZ7+AgZpuWRyDDmkVvJbduu\neO7B2BJ4k0tXuCamIImZE7O7mGj7fj/JKV1CZ716ZV0z4UkWO+v9Ac/UYQKBgAda\nrvjdL6gJA16Ly3Z7WRIS5ijs0Jyj6JMHOiEHoRKsn5XpnKcZbFz9yc3jMEPQyQGV\n+nGYHKhT2UI8zjLFjzid3JPtXzYOh66PW80EpRx/RyPtnyfiw4ZfnTm6j+ERxJK/\nNhaQAJsFovTpFjuVSnxOokf+W4/l0bKgD1Y69YHxAoGAYLZw+CE6shHyKDePxyAa\n9yK7l2bl7ThKRUEd2GfnKqPCEmkEv/aaIBcYxadjVwqkpLZERp+vxlymyp4fn4M2\nLG//skn6TnI+p4xIqO8+KoACS0/EMIlv9upMMAiAq3QGjLQspKorYvdxvlfWfitb\nPtDkGJ4Y2vNXwFog/42y5vM=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-2o41t@shopdemo-a2b23.iam.gserviceaccount.com",
        "client_id": "115390399321448605097",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2o41t%40shopdemo-a2b23.iam.gserviceaccount.com"
      })
    });

    const fbDb = fbAdmin.firestore();

    console.log('Fetching items from Firestore'.cyan.underline.bold)

    fbDb.collection("shop").doc("products").get().then(queryResult => {

      var plainProductArray = queryResult.data().sampleProducts

      console.log('Got items from Firestore'.cyan.underline.bold);

      res.json(plainProductArray)

    }).catch(function (error) {
      console.error('Error fetching document: ', error);
    });


  } catch (error) {
    console.error(`Firebase Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }

});

// @desc fetch single product by id
// @route GET /api/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {

  const fbDb = fbAdmin.firestore();

  console.log('Fetching items from Firestore'.cyan.underline.bold)

  fbDb.collection("shop").doc("products").get().then(queryResult => {

    var plainProductArray = queryResult.data().sampleProducts

    console.log('Got items from Firestore'.cyan.underline.bold);

    for (const property in plainProductArray) {
      if(req.params.id == plainProductArray[property]._id){
        console.log(`Required item = ${plainProductArray[property].name}`)
        res.json(plainProductArray[property])
      }
    }

  }).catch(function (error) {
    console.error('Error fetching document: ', error);
  });
});



// ================= End import from Firebase =========================



// @desc fetch all products
// @route GET /api/products
// @access public

// const getProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find({});
//   console.log(products)
//   res.json(products);
// });



// @desc fetch single product by id
// @route GET /api/products/:id
// @access public
// const getProductById = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (product) {
//     res.json(product);
//   } else {
//     res.status(404);
//     throw new Error("Product not found");
//   }
// });

export { getProducts, getProductById };
