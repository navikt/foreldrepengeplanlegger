@Library('deploy')
import deploy

def deployLib = new deploy()

node {
    def commitHash, commitHashShort, commitUrl, currentVersion
    def project = "navikt"
    def repo = "permisjonsplanlegger"
    def committer, committerEmail, changelog, pom, releaseVersion, nextVersion // metadata
    def appConfig = "nais.yaml"
    def dockerRepo = "docker.adeo.no:5000"
    def branch = "master"
    def groupId = "nais"
    def environment = 'q1'
    def zone = 'sbs'
    def namespace = 'default'

    stage("Checkout") {
        cleanWs()
        withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088']) {
            sh(script: "git clone https://github.com/${project}/${repo}.git .")
        }
        commitHash = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
        commitHashShort = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        commitUrl = "https://github.com/${project}/${repo}/commit/${commitHash}"
        committer = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()
        committerEmail = sh(script: 'git log -1 --pretty=format:"%ae"', returnStdout: true).trim()
        changelog = sh(script: 'git log `git describe --tags --abbrev=0`..HEAD --oneline', returnStdout: true)
    }

    stage("Initialize") {
        releaseVersion = "${env.major_version}.${env.BUILD_NUMBER}-${commitHashShort}"
        echo "release version: ${releaseVersion}"
    }

    stage("Build, test and install artifact") {
        withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088']) {
            sh "npm install"
            sh "npm run test"
            sh "npm run build"
        }
    }

    stage("Release") {
        sh "docker build --build-arg version=${releaseVersion} --build-arg app_name=${repo} -t ${dockerRepo}/${repo}:${releaseVersion} ."
    }
    
    stage("Publish artifact") {
        sh "docker push ${dockerRepo}/${repo}:${releaseVersion}"
    }

    stage("publish yaml") {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'nexusUser', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
            sh "curl --user uploader:upl04d3r --upload-file ${appConfig} https://repo.adeo.no/repository/raw/${groupId}/${repo}/${releaseVersion}/nais.yaml"
        }
    }
    
    stage('Deploy to t') {
        callback = "${env.BUILD_URL}input/Deploy/"
        deployLib.testCmd(releaseVersion)
        deployLib.testCmd(committer)
        def deploy = deployLib.deployNaisApp(repo, releaseVersion, environment, zone, namespace, callback, committer).key
        try {
            timeout(time: 15, unit: 'MINUTES') {
                input id: 'deploy', message: "Check status here:  https://jira.adeo.no/browse/${deploy}"
            }
        } catch (Exception e) {
            throw new Exception("Deploy feilet :( \n Se https://jira.adeo.no/browse/" + deploy + " for detaljer", e)

        }
    }
}
