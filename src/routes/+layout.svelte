<script lang="ts">
    import BottomAppBar from "@smui-extra/bottom-app-bar"
    import TopAppBar, { Row, Section } from "@smui/top-app-bar";
    import Drawer, {
        AppContent,
        Content,
        Header,
        Title,
        Subtitle,
        Scrim,
    } from "@smui/drawer";
    import IconButton, { Icon } from "@smui/icon-button";
    import type { LayoutServerData } from "./$types";
    export let data: LayoutServerData;
    import { loginInfo } from "$lib/store";
    import { onMount } from 'svelte'
    import {
        GoogleAuthProvider,
        browserSessionPersistence,
        getAuth,
        onAuthStateChanged,
        setPersistence,
        signInWithPopup,
        signInWithRedirect
    } from 'firebase/auth';
    import type { User } from 'firebase/auth'
    import {
        getApps,
        initializeApp,
        FirebaseError,

        type FirebaseOptions

    } from 'firebase/app';

    const firebaseConfig = data.firebaseConfig;
    
    onMount(() => {
        if(getApps().length === 0){
            initializeApp(firebaseConfig);
        }        
        const auth = getAuth();
        const un = onAuthStateChanged(auth, user => {
            if(user){
                loginInfo.set(user);
            }
        })
        return () => {
            un();
        };
    })
    const login = async (firebaseConfig:FirebaseOptions) => {
        if(getApps().length === 0){
            initializeApp(firebaseConfig);
        }
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly'); 
        try{
            await setPersistence(auth, browserSessionPersistence); 
            const result = await signInWithRedirect(auth, provider); 
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential?.accessToken;
            // const user = result.user

            // return { token , user};
        } catch(error){
            if(error instanceof FirebaseError){
                const code = error.code;
                const message = error.message;
                const email = error.customData?.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            } else {
                console.log(error);
            }
        }
    }
    const logout = async(firebaseConfig:FirebaseOptions) => {
        if(getApps().length === 0){
            initializeApp(firebaseConfig);
        }
        const auth = getAuth()
        await auth.signOut()
        location.reload()
    }

    let randomSlogan = Math.floor(Math.random() * 5 + 1)
</script>
<TopAppBar style="background-color:lightblue;position:sticky;top:0; height:fit-content;">
    <Row>
        <Section align="start" toolbar style="display:inline-block;">
            <IconButton class="material-icons">
                menu
            </IconButton>
            <h2 style="text-align:left; display:inline-block; color:blue;">
                CHATTERIA
            </h2>
        </Section>
        <Section align="end" toolbar style="display:inline-block; position:absolute; left:80%;">
            {#if !$loginInfo}
                <h3 style="display:inline-block;">Logged out</h3>
                <IconButton 
                    on:click={async () => {
                        await login(firebaseConfig)
                    }}
                    class="material-icons"
                    style="display:inline-block;"
                >login</IconButton>
            {:else}
                <h3 style="display:inline-block;">Logged in as {$loginInfo.displayName}</h3>
                <IconButton 
                    on:click={async () => await logout(firebaseConfig)}
                    class="material-icons"
                    style="display:inline-block;"
                >logout</IconButton>
            {/if}
        </Section>
    </Row>
</TopAppBar>
<style>
</style>
<slot/>