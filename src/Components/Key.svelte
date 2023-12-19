<script>
    export let char;
    export let keyPressed;
    const keyClass = (char == "ENTER" || char =="DEL")? "key special" : "key";
</script>

<div class={keyClass} on:click={ () => keyPressed(char.toUpperCase()) }>
    {char.toUpperCase()}
</div>

<style>
    .key {
        background-color: lightslategrey;
        color: white;
        padding: 20px 18px;
        margin: 4px 3px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color .3s;

    }

    .key:hover {
        background-color: var(--orange);
    }

    .special {
        padding: 20px 30px;
    }
</style>