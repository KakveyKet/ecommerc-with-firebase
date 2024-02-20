const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall(async (data, context) => {
    // Check if the request is authenticated and has the necessary permissions
    if (!context.auth || !context.auth.token.admin) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'Only admins can add other admins.'
        );
    }

    // Get the email address from the data object
    const email = data.email;

    try {
        // Fetch the user by email
        const userRecord = await admin.auth().getUserByEmail(email);

        // Set custom claims to grant admin privileges
        await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });

        // Return a success message
        return { message: `${email} has been added as admin` };
    } catch (error) {
        // Handle errorsfirebs
        throw new functions.https.HttpsError('internal', error.message);
    }
});
