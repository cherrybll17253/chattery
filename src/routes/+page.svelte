<script lang="ts">
    import type { PageServerData } from "./$types";
    import { onMount } from "svelte"

    import IconButton, { Icon } from "@smui/icon-button";
    import { loginInfo, meetmenubool } from "$lib/store";
    export let data:PageServerData

    let meetmenufull = false;
    // Failed code for user Array pagifying
    // let userArray:Array<Array<Object>> = [];
    // const userPagify = () => {
    //     for(let i = 0; i < data.foundB.length/6; i++){
    //         userArray.push([])
    //         for(let j = 0; j < 6; j++){
    //             if(data.foundB[6*i + j]){
    //                 userArray[i].push(data.foundB[6*i + j])
    //             }
    //         }
    //     }
    // }
    // userPagify();
    // console.log(userArray)
    // let selectedPage = 0;
    
    const checkIfNotAdvancedLoggedIn = () => {
        if($loginInfo)
        for(let i = 0; i < data.foundB.length; i++){
            if(data.foundB[i].userName === $loginInfo.displayName){
                
            } 
        }
    }
</script>
{#each data.foundA as found}
    <div class="room">

    </div>
{/each}
{#if $meetmenubool}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="meetmenu" 
        on:mouseenter={()=>{meetmenufull = true}}
        on:mouseleave={()=>{meetmenufull = false}}
    >
        <h2>Meet People</h2>
        {#if meetmenufull}
            {#each data.foundB as found}
                <div class="usercell">
                    <h2>{found.userName}#{found.userTag}</h2>
                    <h4>{found.userBio}</h4>
                </div>
            {/each}
        {/if}
    </div>
{/if}
<style>
    .room{
        width:99%;
        height:200px;
        border: solid blue 1px;
        background-color: aquamarine;
    }
    .meetmenu{
        position:absolute;
        left:50%;
        width:49%;
        height:40px;
        background-color: lightblue;
        z-index:8000;
        transition: height 0.5s;
    }
    .meetmenu:hover{
        height:10000px;
    }
    .usercell{
        position:relative;
        display:inline-block;
        height:1%;
        width:99%;
        border:solid blue 1px;
        background-color: aqua;
        z-index:9000;
    }
    .meetmenu h2{
        text-align:center;
        margin:0;
    }
    .meetmenu .usercell h2{
        text-align:left;
        margin:0;
    }
</style>