@Library('deploy')
import deploy

def deployLib = new deploy()

node {
    def commitHash, commitHashShort, commitUrl, currentVersion
    def project = "navikt"
    def repo = "permisjonsplanlegger"
    def app = "foreldrepengeplanlegger"
    def committer, committerEmail, changelog, pom, releaseVersion, nextVersion // metadata
    def appConfig = "nais.yaml"
    def dockerRepo = "docker.adeo.no:5000"
    def branch = "master"
    def groupId = "nais"
    def zone = 'sbs'
    def namespace = 'default'

    stage("Initialize") {
        cleanWs()
        withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088']) {
            sh(script: "git clone https://${token}:x-oauth-basic@github.com/${project}/${repo}.git .")
        }
        commitHash = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
        commitHashShort = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        commitUrl = "https://github.com/${project}/${repo}/commit/${commitHash}"
        committer = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()
        committerEmail = sh(script: 'git log -1 --pretty=format:"%ae"', returnStdout: true).trim()
        changelog = sh(script: 'git log `git describe --tags --abbrev=0`..HEAD --oneline', returnStdout: true)

        releaseVersion = "${env.major_version}.${env.BUILD_NUMBER}-${commitHashShort}"
        echo "release version: ${releaseVersion}"
    }

    stage("Build/Test") {
        withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088']) {
            sh "npm -v"
            sh "npm install"
            sh "npm run test"
            sh "npm run build"
        }
    }

    stage("Publish artifacts") {
        sh "docker build --build-arg version=${releaseVersion} --build-arg app_name=${app} -t ${dockerRepo}/${app}:${releaseVersion} ."
        sh "docker push ${dockerRepo}/${app}:${releaseVersion}"

        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'nexusUser', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
            sh "curl --fail -v -u ${env.USERNAME}:${env.PASSWORD} --upload-file ${appConfig} https://repo.adeo.no/repository/raw/${groupId}/${app}/${releaseVersion}/nais.yaml"
        }
    }
    
    stage('Deploy to Preprod') {
        callback = "${env.BUILD_URL}input/Deploy/"
        def deploy = deployLib.deployNaisApp(app, releaseVersion, 't1', zone, namespace, callback, committer).key
        try {
            timeout(time: 15, unit: 'MINUTES') {
                input id: 'deploy', message: "Check status here:  https://jira.adeo.no/browse/${deploy}"
            }
        } catch (Exception e) {
            throw new Exception("Deploy feilet :( \n Se https://jira.adeo.no/browse/" + deploy + " for detaljer", e)
        }
    }

    stage('Deploy to Prod') {
        timeout(time: 5, unit: 'MINUTES') {
            input id: 'prod', message: "Deploy to prod?"
        }

        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'nexusUser', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
            def appPolicies = deployLib.buildAppPolicies(app)
            sh "echo '${appPolicies}' > app-policies.xml"
            sh "curl --fail -v -u ${env.USERNAME}:${env.PASSWORD} --upload-file app-policies.xml https://repo.adeo.no/repository/raw/${groupId}/${app}/${releaseVersion}/am/app-policies.xml"
            sh "curl --fail -v -u ${env.USERNAME}:${env.PASSWORD} --upload-file not-enforced-urls.txt https://repo.adeo.no/repository/raw/${groupId}/${app}/${releaseVersion}/am/not-enforced-urls.txt"
        }

        callback = "${env.BUILD_URL}input/Deploy/"
        def deploy = deployLib.deployNaisApp(app, releaseVersion, 'p', zone, namespace, callback, committer, false).key
        try {
            timeout(time: 15, unit: 'MINUTES') {
                input id: 'deploy', message: "Check status here:  https://jira.adeo.no/browse/${deploy}"
            }
        } catch (Exception e) {
            throw new Exception("Deploy feilet :( \n Se https://jira.adeo.no/browse/" + deploy + " for detaljer", e)
        }
    }
}
